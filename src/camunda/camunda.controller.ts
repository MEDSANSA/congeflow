import { Controller, Inject, Get, Post, Param, Body } from '@nestjs/common';
import { CamundaService } from './camunda.service';
import { ZBClient } from 'zeebe-node';
import { WINSTON_MODULE_PROVIDER } from '@payk/nestjs-winston';
import { ZEEBE_CONNECTION_PROVIDER, ZeebeJob, ZeebeWorker } from 'nestjs-zeebe';
import { ZBWorker, ICustomHeaders, IInputVariables, IOutputVariables } from 'zeebe-node';
import { Ctx, Payload } from '@nestjs/microservices';
import { Logger } from 'winston';
import { CreateProcessInstanceResponse } from 'zeebe-node';

@Controller('test')
export class CamundaController {
    constructor(private readonly CamundaService: CamundaService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        @Inject(ZEEBE_CONNECTION_PROVIDER) private readonly zbClient: ZBClient) {
        this.zbClient = new ZBClient(
            {
                onReady: () => this.logger.info('Ready for action!'),
                onConnectionError: () => this.logger.error('The gRPC connection failed!')
            }
        )
        this.zbClient.deployProcess('./bpmn/congerequest.bpmn');
    }

    @Post('/start-process')
    async startProcess(@Body() body): Promise<CreateProcessInstanceResponse> {
        if (this.zbClient.connected) {
            const variables = {
                dateDeConge: body.dateDeConge,
                dateDeReprise: body.dateDeReprise,
                nombreDeJours: body.nombreDeJours,
                Type: body.Type,
                Description: body.Description,
                File: body.File
            };
            return await this.zbClient.createProcessInstance('congeprocess', variables);
        } else {
            this.logger.info("failed!");
        }
    }

    @Get('/end-process/:processid')
    async endProcess(@Param() param): Promise<void> {
        const { processid } = param;
        return await this.endProcess(processid);
    }

    @ZeebeWorker('request')
    async handleUserTask(@Payload() job: ZeebeJob, @Ctx() context: { complete, worker: ZBWorker<IInputVariables, ICustomHeaders, IOutputVariables> }) {
        console.log('inventory-service, Task variables', job.variables);
        let updatedVariables = Object.assign({}, job.variables, {
            dateDeConge: job.variables.dateDeConge,
            dateDeReprise: job.variables.dateDeReprise,
            nombreDeJours: job.variables.nombreDeJours,
            Type: job.variables.Type,
            Description: job.variables.Description,
            File: job.variables.File
        });
        await job.complete(updatedVariables);
    }


    /*
    @ZeebeWorker('request')
    async handleUserTask(job, complete) {
        try {
            const shouldCompleteAutomatically = true;

            if (shouldCompleteAutomatically) {
                await complete.success();
                job.complete.success();
            } else {
                console.log("no data");
            }
        } catch (error) {
            console.error('Error handling the task:', error);
            await complete.failure('Error handling the task');
        }
    }
/*
    //test gateway
    @ZeebeWorker('Flow_1rcspiu')
    async usertask(job) {
        const taskvariables = job.variables;
        const etat = taskvariables.etat;

        if (etat === 'approved') {
            // Complete the task and route to 'flow_approved'
            await job.complete({ outcome: 'flow_approved' });
        } else if (etat === 'waiting') {
            // Complete the task and route to 'Flow_waiting'
            await job.complete({ outcome: 'Flow_waiting' });
        } else {
            // Handle other cases or errors as needed
            await job.complete({ outcome: 'unknown' });
        }
    }
    */
}