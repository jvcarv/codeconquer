import { PartialType } from '@nestjs/mapped-types';
import { CreatePrefectureDto } from './create-prefecture.dto';

export class UpdatePrefectureDto extends PartialType(CreatePrefectureDto) { }
