import envConfig from "./env-config";

export default {
    ADDRESS: `${envConfig.api.address}:${envConfig.api.port}`,
    LOGIN: '/api/Account/Login',
    REGISTER: '/api/Account/Register',
    REGION: '/api/RegionCaseData',
    PROVINCE: '/api/ProvinceCaseData',
    PROVINCE_DAY: '/api/ProvinceCaseDayData',
    COMBINED_DAILY_CASE: '/api/CombinedDailyCase',
    CASE_UPDATE: '/api/CaseUpdate',
    PATIENT: '/api/Patient',
    IMPORT_PROVINCE_DATA: '/api/Import/ProvinceData',
    IMPORT_REGION_DATA: '/api/Import/RegionData',
    IMPORT_PATIENT_DATA: '/api/Import/PatientData',
    IMPORT_CASE_UPDATE_DATA: '/api/Import/CaseUpdateData',
}
