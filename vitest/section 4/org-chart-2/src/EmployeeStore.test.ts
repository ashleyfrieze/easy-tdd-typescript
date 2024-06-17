import { EmployeeStore } from './EmployeeStore';
import emp1 from './data/emp1.json';
import emp2 from './data/emp2.json';
import { createEmployee } from './employee-test-factory';

describe('Employee store', () => {
  let employeeStore: EmployeeStore;

  beforeEach(() => {
    employeeStore = new EmployeeStore();
  });

  it('will not find an unknown employee', () => {
    expect(employeeStore.get('emp999')).toBeUndefined();
  });

  it('can store an employee and retrieve them', () => {
    // given I have stored an employee
    employeeStore.add(emp1);

    // then I can find them by id
    expect(employeeStore.get('emp1')).not.toBeUndefined();
  });

  it('can store two employees and retrieve them both', () => {
    employeeStore.add(emp1);
    employeeStore.add(emp2);

    expect(employeeStore.get('emp1')).toEqual(emp1);
    expect(employeeStore.get('emp2')).toEqual(emp2);
  });

  it('can store three employees and retrieve them all', () => {
    employeeStore.add(createEmployee('leader1'));
    employeeStore.add(createEmployee('leader2'));
    employeeStore.add(createEmployee('leader3'));

    expect(employeeStore.get('leader1')).toMatchObject({ id: 'leader1' });
    expect(employeeStore.get('leader2')).toMatchObject({ id: 'leader2' });
    expect(employeeStore.get('leader3')).toMatchObject({ id: 'leader3' });
  });

  it('will retrieve the correct employee by id', () => {
    // given I have stored an employee
    employeeStore.add(emp1);

    // then I cannot find them with the wrong id
    expect(employeeStore.get('emp999')).toBeUndefined();
  });

  it('cannot find a relationship for an employee if that relationship does not exist', () => {
    expect(employeeStore.getManager('emp1')).toBeUndefined();
  });

  it('is invalid to add a relationship between unknown employees', () => {
    expect(() =>
      employeeStore.addRelationship({ manager: 'emp77', managed: 'emp66' })
    ).toThrow();
  });

  it('is invalid to add a relationship between an unknown manager and a known employee', () => {
    employeeStore.add(createEmployee('emp66'));

    expect(() =>
      employeeStore.addRelationship({ manager: 'emp77', managed: 'emp66' })
    ).toThrow();
  });

  it('is invalid to add a relationship between an known manager and an unknown employee', () => {
    employeeStore.add(createEmployee('leader77'));

    expect(() =>
      employeeStore.addRelationship({ manager: 'leader77', managed: 'emp66' })
    ).toThrow('emp66 does not exist');
  });

  it('is invalid to add a relationship between an known manager and an unknown employee', () => {
    employeeStore.add(createEmployee('leader77'));
    employeeStore.add(createEmployee('emp33'));

    employeeStore.addRelationship({ manager: 'leader77', managed: 'emp33' });

    expect(employeeStore.getManager('emp33')).toMatchObject({ id: 'leader77' });
  });

  it('can find multiple managees under the same manager', () => {
    const emp33 = createEmployee('emp33');
    const emp22 = createEmployee('emp22');

    employeeStore.add(createEmployee('leader77'));
    employeeStore.add(emp33);
    employeeStore.add(emp22);

    employeeStore.addRelationship({ manager: 'leader77', managed: 'emp33' });
    employeeStore.addRelationship({ manager: 'leader77', managed: 'emp22' });

    expect(employeeStore.getManageesOf('leader77')).toEqual([emp33, emp22]);
  });

  it('can find multiple managees under the same manager using lighter weight comparisons', () => {
    employeeStore.add(createEmployee('leader77'));
    employeeStore.add(createEmployee('emp33'));
    employeeStore.add(createEmployee('emp22'));

    employeeStore.addRelationship({ manager: 'leader77', managed: 'emp33' });
    employeeStore.addRelationship({ manager: 'leader77', managed: 'emp22' });

    expect(employeeStore.getManageesOf('leader77')).toEqual([
      expect.objectContaining({ id: 'emp33' }),
      expect.objectContaining({ id: 'emp22' }),
    ]);
  });

  it('will find no managees under someone with none', () => {
    employeeStore.add(createEmployee('leader77'));

    expect(employeeStore.getManageesOf('leader77')).toEqual([]);
  });

  // solution to the problem
  it('can find members of the same team', () => {
    employeeStore.add(createEmployee('leader77'));
    employeeStore.add(createEmployee('emp33'));
    employeeStore.add(createEmployee('emp22'));

    employeeStore.addRelationship({ manager: 'leader77', managed: 'emp33' });
    employeeStore.addRelationship({ manager: 'leader77', managed: 'emp22' });

    expect(employeeStore.getTeamMembers('emp33')).toEqual([
      expect.objectContaining({ id: 'emp33' }),
      expect.objectContaining({ id: 'emp22' }),
    ]);
  });

  it('will find no members of a team if there is no leader', () => {
    employeeStore.add(createEmployee('emp33'));

    expect(employeeStore.getTeamMembers('emp33')).toEqual([]);
  });

  it('get organisation under single tier manager', () => {
    employeeStore.add(createEmployee('leader77'));
    employeeStore.add(createEmployee('emp33'));
    employeeStore.add(createEmployee('emp22'));

    employeeStore.addRelationship({ manager: 'leader77', managed: 'emp33' });
    employeeStore.addRelationship({ manager: 'leader77', managed: 'emp22' });

    expect(employeeStore.getOrgChart('leader77')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 'emp22' }),
        expect.objectContaining({ id: 'emp33' }),
      ])
    );
  });

  it('get organisation under two tier managemennt', () => {
    employeeStore.add(createEmployee('leader77'));
    employeeStore.add(createEmployee('emp33'));
    employeeStore.add(createEmployee('emp22'));
    employeeStore.add(createEmployee('junior11'));

    employeeStore.addRelationship({ manager: 'leader77', managed: 'emp33' });
    employeeStore.addRelationship({ manager: 'leader77', managed: 'emp22' });
    employeeStore.addRelationship({ manager: 'emp22', managed: 'junior11' });

    expect(employeeStore.getOrgChart('leader77')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 'junior11' }),
        expect.objectContaining({ id: 'emp22' }),
        expect.objectContaining({ id: 'emp33' }),
      ])
    );
  });
});
