import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

/** Query params de paginación de `GET /api/student`. */
export class PaginationDto {
  /** Cantidad de registros a devolver (por defecto 10 en el servicio). */
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number;

  /** Registros a saltar: 0 significa "empezar desde el principio". */
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  skip?: number;
}
