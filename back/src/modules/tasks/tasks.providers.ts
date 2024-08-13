import {POST_REPOSITORY, TASK_REPOSITORY} from '../../core/constants';
import {Task} from "./task.entity";

export const tasksProviders = [{
    provide: TASK_REPOSITORY,
    useValue: Task,
}];