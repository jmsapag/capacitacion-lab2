import { IsNotEmpty} from 'class-validator';

export class TaskDto {

    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly completed: boolean;
}