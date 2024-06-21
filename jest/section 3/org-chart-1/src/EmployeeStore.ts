import { Employee } from './types';

export class EmployeeStore {
  private employees = new Map<string, Employee>();
  private managersOf = new Map<string, string>();
  private managees = new Map<string, string[]>();

  add(employee: Employee) {
    this.employees.set(employee.id, employee);
  }

  get(id: string): Employee | undefined {
    return this.employees.get(id);
  }

  getManager(id: string): Employee | undefined {
    const managerId = this.managersOf.get(id);
    if (managerId) {
      return this.get(managerId);
    }
    return undefined;
  }

  addRelationship({ manager, managed }: { manager: string; managed: string }) {
    if (!this.get(manager)) {
      throw new Error(`${manager} does not exist`);
    }
    if (!this.get(managed)) {
      throw new Error(`${managed} does not exist`);
    }
    this.managersOf.set(managed, manager);
    if (!this.managees.has(manager)) {
      this.managees.set(manager, []);
    }
    this.managees.get(manager)?.push(managed);
  }

  getManageesOf(id: string): Employee[] {
    return (this.managees.get(id) || [])
      .map((employeeId) => this.get(employeeId))
      .filter((item): item is Employee => Boolean(item));
  }
}
