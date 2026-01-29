// Scenario table data and initialization using the existing dynamic table component.
const coloradoTableData = [

    {
        scenarioName: 'Office Visits Billed for Hospital Inpatients',
        scenarioType: 'Automated',
        scenarioDescription:
            'This concept will identify professional and outpatient claims where an office visit was billed during an Inpatient Hospital stay. Inpatient Hospital Services means the preventive, therapeutic, surgical, diagnostic, medical and rehabilitative services that are furnished by a hospital for the care and treatment of Inpatients and are provided in the hospital by or under the direction of a physician. Office or Outpatient procedure codes should not be billed while the patient is in an Inpatient Facility. The services received while the patient is in an inpatient facility would be included in the facility’s appropriate reimbursement',
        providerType: [],
        dateApproved: '8/4/2020'
    },
    {
        scenarioName: 'Global Surgery',
        scenarioType: 'Automated',
        scenarioDescription:
            'This concept identifies claims for patients who have had E&M services billed within the global period of a surgical procedure. The payment for the surgical procedure includes the pre-operative, inter-operative and post-operative care. This is known as the global surgical package. Payment may not be made for services included in the global surgical package when furnished by the same physician who performed the surgery. ',
        providerType: ['Professional'],
        dateApproved: '9/1/2020'
    },
    {
        scenarioName: 'Technical Component While IP',
        scenarioType: 'Automated',
        scenarioDescription:
            'Technical component paid while patient is inpatient.  Findings are full overpayments based on PC/TC Indicator 1 billed with mod TC and PC/TC Indicator 3.  Good claims are inpatient claims.',
        providerType: [],
        dateApproved: '4/13/2021'
    },
    {
        scenarioName: 'NCCI Indicator 1 and 0',
        scenarioType: 'Automated',
        scenarioDescription:
            'NCCI edits are pairs of Current Procedural Terminology (CPT) or Healthcare Common Procedure Coding System (HCPCS) Level II codes that are not separately payable except under certain circumstances. The edits are applied to services billed by the same provider for the same beneficiary on the same date of service. All edits consist of code pairs that are arranged in two columns (Column 1 and Column 2). Codes listed in Column 2 are not payable if performed on the same day, on the same patient, by the same provider as the code listed in Column 1, unless the edits permit the use of a modifier associated with the NCCI. ',
        providerType: ['Professional'],
        dateApproved: '8/17/2021'
    },
    {
        scenarioName: 'Assistant Surgeon Rate Not Applied Correctly',
        scenarioType: 'Automated',
        scenarioDescription:
            'Assistant Surgeon claims billed with the following provider types should be paid at 20% of the total rate. Provider types: 10 (modifier 51 only), 12, 17 (all specialties except 180, 181, 182), 20, 21, 22, 24, 25, 26, 27, 34, 36, 41, 43. This concept will identify the claims where the correct rate was not paid and an overpayment occurred.',
        providerType: ['Professional'],
        dateApproved: '9/29/2021'
    },
    {
        scenarioName: 'Excessive Units of Critical Care Services',
        scenarioType: 'Automated',
        scenarioDescription:
            'The CPT code 99291 is used to report the first 30 - 74 minutes of critical care on a given calendar date of service. It should only be used once per calendar date per patient by the same physician or physician group of the same specialty.',
        providerType: [],
        dateApproved: '10/13/2021'
    },
    {
        scenarioName: 'Non-Covered Laboratory Services',
        scenarioType: 'Automated',
        scenarioDescription:
            'This concept will identify laboratory services for CPT codes 84410, 86079, 86512-86513, 87505-87507, 87631-87633, 87483, 88380, 89049 and 86910-86911 billed by provider type 43 that are not covered by Nevada Medicaid. Per the Nevada Medicaid policy, the services are not covered, but were paid, which resulted in an overpayment.',
        providerType: [],
        dateApproved: '10/13/2021'
    },
    {
        scenarioName: 'Incorrect Processing of Void and No-Pay Bill Types (Incorrectly paid claims with bill type ending in 8 or 0)',
        scenarioType: 'Automated',
        scenarioDescription:
            'This concept will identify institutional healthcare claims (837I) submitted with Type of Bill (TOB) codes that are identified as informational only or that further action was needed from the provider/biller, but no payment should have been made. To identify the incorrect claims, we will select the bill types that have an eight (8) or a zero (0).',
        providerType: [],
        dateApproved: '3/28/2022'
    },
    {
        scenarioName: 'Personal Care Services during SNF',
        scenarioType: 'Automated',
        scenarioDescription:
            'Personal care services are available to recipients who are not inpatients or resident of a hospital, nursing facility (NF), intermediate care facility for the mentally retarded (ICF/MR), or institution for mental disease or other excluded settings. Therefore separate reimbursement by Medicaid for personal care services while the recipient is in a nursing facility is an overpayment.',
        providerType: [],
        dateApproved: '3/28/2022'
    },
    {
        scenarioName: 'Excessive Initial Hospital Care Services/IP Subsequent Visits',
        scenarioType: 'Automated',
        scenarioDescription:
            'The initial hospital care services per day codes (99221-99223) describes the first encounter with the patient by the admitting physician. For initial inpatient encounters by a physician other the admitting physician, see initial inpatient consultation codes (99251-99255) or subsequent hospital care codes (99231-99233) should be used.',
        providerType: [],
        dateApproved: '1/30/2023'
    },
    {
        scenarioName: 'Excessive Units of Per Diem Codes',
        scenarioType: 'Automated',
        scenarioDescription:
            'This concept will identify claims for ‘per diem’ codes that have been reported more than once per day by the same physician. Based on the CPT Manual (Current Procedural Terminology), there are initial and subsequent hospital care procedure codes that are listed as ‘per day’ and can only be billed once per day. When the codes are billed more than once per day by a physician(s) with the same specialty code and provider type the visit should not be allowed. An overpayment may occur when more than one per diem code has been reported more than once per day and paid for the same physician.',
        providerType: [],
        dateApproved: '1/30/2023'
    },
    {
        scenarioName: 'Excessive Billing of Inpatient Consultation Codes',
        scenarioType: 'Automated',
        scenarioDescription:
            'According to CPT guidelines, inpatient consultations are only payable once per inpatient admission.',
        providerType: [],
        dateApproved: '1/30/2023'
    },
    {
        scenarioName: 'Independent Labs during Inpatient Stay',
        scenarioType: 'Automated',
        scenarioDescription:
            'Inpatient claims are paid an all-inclusive per diem rate that includes all routine and ancillary services provided by the facility. Laboratory services received during the inpatient stay are included in the per diem rate and not reimbursed separately. ',
        providerType: [],
        dateApproved: '2/8/2023'
    },
    {
        scenarioName: 'Radiology Unbundling',
        scenarioType: 'Automated',
        scenarioDescription:
            'Radiology codes billed with modifier RT/LT should bill with both modifiers on one claim line. Claim that are billed with the services on two separate lines are deny for unbundling.',
        providerType: [],
        dateApproved: '10/20/2023'
    },
    {
        scenarioName: 'Behavioral Health Limits',
        scenarioType: 'Automated',
        scenarioDescription:
            'This concept will identify claims for psychotherapy procedures that have been reported more than once per day. The Nevada Medicaid policy states that the procedure codes have a service limit of 1 per day, therefore only allowing the codes to be billed and paid once per day. If the provider bills the codes more than once per day, it is considered an overpayment.',
        providerType: [],
        dateApproved: '2/22/2024'
    },
    {
        scenarioName: 'Inappropriate services billed with a Telehealth visit',
        scenarioType: 'Automated',
        scenarioDescription:
            'Billing for services such as injections, labs, x-rays, and surgery would not be appropriate when the member is not present in the provider’s office to receive the service. An overpayment occurs when the telehealth visit is billed with an inappropriate service that the patient was not present in the office to receive.',
        providerType: [],
        dateApproved: '2/26/2024'
    },
    {
        scenarioName: 'Add-On Codes Paid without a Primary Code',
        scenarioType: 'Automated',
        scenarioDescription:
            'CPT has designated certain codes as "add-on procedures". These services are always done in conjunction with another procedure so they can only be billed at the same time as an appropriate primary service. Query identifies add-on codes paid without an approved required primary code (add-on code either billed alone or billed with other codes not considered a valid primary code for the specific add-on code).',
        providerType: ['Professional'],
        dateApproved: '2/26/2024'
    },
    {
        scenarioName: 'Optical service not covered',
        scenarioType: 'Automated',
        scenarioDescription:
            'Optical supply material hcpcs codes are not a covered benefit per Nevada Medicaid',
        providerType: [],
        dateApproved: '5/15/2024'
    },
    {
        scenarioName: 'Initial hospital visit billed on the same day of discharge',
        scenarioType: 'Automated',
        scenarioDescription:
            'According to AMA coding guidelines for CPT codes 99238 & 99239. These codes are used to report all discharge day services for the hospital inpatient or observation patient, including examination, discharge and follow-up care instructions, and preparation of all medical records. For services performed by other providers on the date of discharge, including instructions to the patient or family/caregiver and post-discharge coordination services, see 99231-99233. Billing an initial visit is considered upcoding.',
        providerType: [],
        dateApproved: '8/9/2024'
    },
    {
        scenarioName: 'Hospital Discharge Services',
        scenarioType: 'Automated',
        scenarioDescription:
            'Only one hospital discharge day management services are payable per patient per hospital stay. Only the attending physician of record reports the discharge day management service. This query will identify where CPT code 99238 and 99239 are billed more than once per inpatient stay.',
        providerType: [],
        dateApproved: '8/9/2024'
    },
    {
        scenarioName: 'Not a New Patient',
        scenarioType: 'Automated',
        scenarioDescription:
            'E&M office visit procedure codes for a new patient may be used for any new patient or any patient that has not been seen by the provider within the past three years.',
        providerType: [],
        dateApproved: '8/9/2024'
    },
    {
        scenarioName: 'Services Paid After Death',
        scenarioType: 'Automated',
        scenarioDescription:
            'Query identifies services paid after the member’s date of death.',
        providerType: [],
        dateApproved: '3/28/2025'
    }


];

const coloradoTableColumns = [
    { header: 'Scenario Name', key: 'scenarioName', width: '15%' },
    { header: 'Scenario Type', key: 'scenarioType', width: '12%' },
    { header: 'Scenario Description', key: 'scenarioDescription', width: '53%', className: 'scenario-desc-col'},
    { header: 'Provider Type', key: 'providerType', width: '10%',  listStyle: true },
    { header: 'Date Approved', key: 'dateApproved', width: '10%' }
];

document.addEventListener('DOMContentLoaded', () => {
    TableGenerator.init(coloradoTableData, 'scenarioTableContainer', coloradoTableColumns, {
        sortConfig: {
            scenarioName: { type: 'string' },
            scenarioType: { type: 'custom', order: ['Automated', 'Complex'] },
            providerType: { type: 'string' },
            dateApproved: { type: 'date' }
        },
        searchPlaceholder: 'Search with Scenario Name'
    });
});
