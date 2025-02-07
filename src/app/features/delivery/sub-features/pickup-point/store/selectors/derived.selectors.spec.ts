// import { BaseSelectors } from '../types/base-selectors.interface';
//
// describe('Derived selectors', () => {
//   describe('selectAvailableOffices', () => {
//     const selectedCity: StartCity = {
//       id: '1',
//       name: 'City 1',
//       office_id: 'office1'
//     };
//
//     const offices: Office[] = [
//       { id: '1', name: 'Office 1', office_id: 'office1', give: '1', pickup: '1' },
//       { id: '2', name: 'Office 2', office_id: 'office2', give: '1', pickup: '1' }
//     ];
//
//     // Создаем заглушки для базовых селекторов
//     const baseSelectorsStub: BaseSelectors = {
//       selectOffices: () => [],
//       selectSelectedCity: () => null,
//       selectActiveTabId: () => null,
//       selectIsCitiesLoading: () => false,
//       selectIsOfficesLoading: () => false,
//       selectCitiesError: () => null,
//       selectOfficesError: () => null,
//       selectSelectedOffice: () => null,
//       selectCities: () => [],
//       selectCourierPoint: () => null,
//       selectDepartureDate: () => null,
//       selectFormState: () => ({ isValid: false })
//     };
//
//     // Создаем селекторы с заглушками
//     const derivedSelectors = createDerivedSelectors(baseSelectorsStub);
//     const { selectAvailableOffices } = derivedSelectors;
//
//     it('should return empty array when no city selected', () => {
//       const result = selectAvailableOffices.projector(offices, null);
//       expect(result).toEqual([]);
//     });
//
//     it('should filter offices by selected city office_id', () => {
//       const result = selectAvailableOffices.projector(offices, selectedCity);
//       expect(result).toEqual([offices[0]]);
//     });
//
//     it('should return empty array when no offices match selected city', () => {
//       const noMatchOffices: Office[] = [
//         { id: '2', name: 'Office 2', office_id: 'office2', give: '1', pickup: '1' }
//       ];
//
//       const result = selectAvailableOffices.projector(noMatchOffices, selectedCity);
//       expect(result).toEqual([]);
//     });
//   });
// });
