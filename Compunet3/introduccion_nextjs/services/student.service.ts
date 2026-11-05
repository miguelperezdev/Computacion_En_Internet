import axios, { type AxiosInstance } from "axios";
import type { Student } from "@/interfaces/student.interface";

const REQUEST_TIMEOUT = 10_000;

const normalizeStudents = (payload: unknown): Student[] => {
  if (Array.isArray(payload)) {
    return payload as Student[];
  }

  if (payload && typeof payload === "object") {
    const record = payload as Record<string, unknown>;

    for (const key of ["data", "students", "items"]) {
      if (Array.isArray(record[key])) {
        return record[key] as Student[];
      }
    }
  }

  return [];
};

export class StudentService {
  private client?: AxiosInstance;

  private getClient(): AxiosInstance {
    if (!this.client) {
      const baseURL = process.env.API_URL?.trim().replace(/\/+$/, "");

      if (!baseURL) {
        throw new Error(
          "La variable de entorno API_URL no está definida. Agrégala en tu archivo .env.",
        );
      }

      this.client = axios.create({
        baseURL,
        timeout: REQUEST_TIMEOUT,
        headers: {
          Accept: "application/json",
        },
      });
    }

    return this.client;
  }

  async getStudents(): Promise<Student[]> {
    const { data } = await this.getClient().get<unknown>("/student");
    return normalizeStudents(data);
  }
}

export const studentService = new StudentService();
