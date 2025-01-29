// Define types for errors, responses, and other common structures

export type ErrorResponse = {
    response?: {
      status?: number;
      body?: {
        errorCode?: string;
        message?: string;
      };
    };
    message?: string;
    details?: {
      reason?: string;
    };
    isAuthenticationError?: boolean;
  };
  
  export type SuccessResponse<T> = {
    success: true;
    data: T;
    message: string;
  };
  
  export type FailureResponse = {
    success: false;
    errorCode: string;
    errorMessage: string;
    details?: unknown;
  };
  
  export type APIResponse<T> = SuccessResponse<T> | FailureResponse;
  
  export type FetchOptions = {
    method: "GET" | "POST" | "PUT" | "DELETE";
    headers?: Record<string, string>;
    body?: string;
  };
  
  export type FetchError = {
    status: number;
    statusText: string;
    url: string;
    body?: unknown;
  };
  
  export interface EnvelopeDocument {
    documentId: string;
    documentIdGuid: string;
    name: string;
    type: string;
    order: string;
    uri: string;
    authoritativeCopy: string;
    display: string;
    includeInDownload: string;
    signerMustAcknowledge: string;
    templateRequired: string;
    availableDocumentTypes: {
      isDefault: string;
      type: string;
    }[];
    pages?: {
      dpi: string;
      height: string;
      pageId: string;
      sequence: string;
      width: string;
    }[];
  }
  

  export interface Envelope {
    allowMarkup: string;
    anySigner: string | null;
    attachmentsUri: string;
    autoNavigation: string;
    certificateUri: string;
    createdDateTime: string;
    customFieldsUri: string;
    documentsCombinedUri: string;
    documentsUri: string;
    emailSubject: string;
    envelopeId: string;
    envelopeIdStamping: string;
    envelopeLocation: string;
    envelopeUri: string;
    expireAfter: string;
    expireEnabled: string;
    isSignatureProviderEnvelope: string;
    lastModifiedDateTime: string;
    notificationUri: string;
    purgeState: string;
    recipientsUri: string;
    sender: {
      accountId: string;
      email: string;
      ipAddress: string;
      userId: string;
      userName: string;
    };
    sentDateTime: string;
    signingLocation: string;
    status: string;
    statusChangedDateTime: string;
    templatesUri: string;
  }
  

  // *******************************************************************
  // *******************************************************************
  // *******************************************************************
  export type FormValueConfidentialityAgreement = 
  | string 
  | null 
  | File 
  | Array<{ name: string; description: string; price: string }>;

  export type FormDataConfidentialityAgreement = {
    signer1Email?: string
    signer1Name?: string
    // signer1ClientId?: string
    signer2Email?: string
    signer2Name?: string
    // signer2ClientId?: string
    // ccEmail?: string
    // ccName?: string
    // docFile?: File | null | string
    contractName?: string

    person_1: {
      full_name: {
        first_name: string
        last_name: string
      }
      address: {
        street: string
        city: string
        state: string
        zip: string
      }
      state: string
      country: string
      email: string
    }
    person_2: {
      full_name: {
        first_name: string
        last_name: string
      }
      address: {
        street: string
        city: string
        state: string
        zip: string
      }
      state: string
      country: string
      email: string
    }
    current_date: string
    date: string
    contract_name: string
    contract_type: string
    jurisdiction: string
  }

  export type FormDataSupplyAgreement = {
    signer1Email: string
    signer1Name: string
    signer2Email: string
    signer2Name: string
    contractName?: string
    // signer1ClientId: string
    // signer2ClientId: string
    // ccEmail: string
    // ccName: string
    // docFile: File | null | string
    company: {
      name: string
      street: string
      city: string
      state: string
      postalCode: string
      country: string
    }
    supplier: {
      name: string
      street: string
      city: string
      state: string
      postalCode: string
      country: string
      date: string
    }
    products: Array<{ name: string; description: string; price: string }>
    deliveryDays: string
    terminationNoticeDays: string
    remedyPeriodDays: string
    paymentTermDays: string
    interestRate: string
    warrantyPeriod: string
    governingState: string
    supplierSignature: {
      signature: string
      firstName: string
      lastName: string
      date: string
    }
    companySignature: {
      signature: string
      firstName: string
      lastName: string
      date: string
    }
  }

  export type FormValueSupplyAgreement = 
  | string 
  | null 
  | File 
  | Array<{ name: string; description: string; price: string }>;


export type FormDataConsultingAgreement = {
  signer1Email?: string
  signer1Name?: string
  signer2Email?: string
  signer2Name?: string
  contractName?: string

  contract: {
    name: string
    current_date: string
    date: string
    start_date: string
    services: string[]
  }
  terms: {
    jurisdiction: string
    duration: string
    payment_method: string
    amount: string
    late_fee: string
    penalty: string
    time_period: string
  }
  consultant: {
    company_name: string
    email: string
    full_name: {
      first_name: string
      last_name: string
    }
    address: {
      street: string
      city: string
      state: string
      zip: string
    }
    state: string
    country: string
    geographical_area: string
  }
  client: {
    company_name: string
    email: string
    full_name: {
      first_name: string
      last_name: string
    }
    address: {
      street: string
      city: string
      state: string
      zip: string
    }
    state: string
    country: string
  }
}

export type FormValueConsultingAgreement =
  | string // For primitive string fields (e.g., name, jurisdiction, duration, etc.)
  | string[] // For arrays of strings (e.g., services)
  | {     // For nested objects like full_name
      first_name: string;
      last_name: string;
    }
  | {     // For nested address objects
      street: string;
      city: string;
      state: string;
      zip: string;
    }
  | null; // For optional/nullable fields


export type FormDataCopyrightAssignmentAgreement = {
  signer1Email?: string
  signer1Name?: string
  signer2Email?: string
  signer2Name?: string
  contractName?: string

  contract: {
    name: string
    current_date: string
    governing_law: string
    jurisdiction: string
    execution_date: string
  }
  transferor: {
    address: {
      street: string
      street_line_2: string
      city: string
      state: string
      postal: string
      country: string
    }
    phone: string
    email: string
    signature: {
      name: string
      date: string
    }
  }
  transferee: {
    address: {
      street: string
      street_line_2: string
      city: string
      state: string
      postal: string
      country: string
    }
    phone: string
    email: string
    signature: {
      name: string
      date: string
    }
  }
  work: {
    name: string
    description: string
  }
}


export type FormValueCopyrightAssignmentAgreement =
  | string // For primitive string fields (e.g., name, current_date, governing_law, etc.)
  | {     // For nested address objects
      street: string;
      street_line_2: string;
      city: string;
      state: string;
      postal: string;
      country: string;
    }
  | {     // For nested signature objects
      name: string;
      date: string;
    }
  | {     // For nested work objects
      name: string;
      description: string;
    }
  | null; // For optional/nullable fields



export type FormDataIndependentContractorAgreement = {
  signer1Email?: string
  signer1Name?: string
  signer2Email?: string
  signer2Name?: string
  contractName?: string

  contract: {
    name: string
    date: {
      day: number
      month: string
      year: number
    }
    governing_law: string
  }
  contractor: {
    name: string
    address: {
      street: string
      street_line_2: string
      city: string
      state: string
      postal: string
      country: string
    }
    phone: string
    email: string
    signature_date: string
  }
  client: {
    name: string
    address: {
      street: string
      street_line_2: string
      city: string
      state: string
      postal: string
      country: string
    }
    phone: string
    email: string
    signature_date: string
  }
  subject: string
  scope_of_work: string
  term: {
    duration: string
    start_date: string
    end_date: string
  }
  termination: {
    notice_period_days: number
  }
  payment: {
    total_amount: string
    schedule: {
      initial_payment: {
        date: string
        amount: string
      }
      first_payment: {
        date: string
        amount: string
      }
      second_payment: {
        date: string
        amount: string
      }
      final_payment: {
        date: string
        amount: string
      }
    }
    late_payment_interest: string
  }
}


export type FormValueIndependentContractorAgreement =
  | string // For primitive string fields (e.g., signer1Email, signer2Email, contractName, etc.)
  | number // For primitive number fields (e.g., days for notice period, contract date day, etc.)
  | {     // For date object within contract
      day: number;
      month: string;
      year: number;
    }
  | {     // For nested address objects (contractor, client)
      street: string;
      street_line_2: string;
      city: string;
      state: string;
      postal: string;
      country: string;
    }
  | {     // For nested payment schedule (initial, first, second, final payment)
      date: string;
      amount: string;
    }
  | {     // For payment schedule object (includes initial, first, second, final payment)
      initial_payment: { date: string; amount: string };
      first_payment: { date: string; amount: string };
      second_payment: { date: string; amount: string };
      final_payment: { date: string; amount: string };
    }
  | {     // For nested term object
      duration: string;
      start_date: string;
      end_date: string;
    }
  | {     // For nested payment object
      total_amount: string;
      schedule: {
        initial_payment: { date: string; amount: string };
        first_payment: { date: string; amount: string };
        second_payment: { date: string; amount: string };
        final_payment: { date: string; amount: string };
      };
      late_payment_interest: string;
    }
  | {     // For nested contractor and client signature fields
      signature_date: string;
    }
  | null; // For optional/nullable fields like signer1Email, signer1Name, signer2Email, etc.



export type FormDataIntellectualPropertyAgreement = {
  signer1Email?: string
  signer1Name?: string
  signer2Email?: string
  signer2Name?: string
  contractName?: string

  company: {
    name: string
    streetAddress: string
    streetAddressLine2: string
    city: string
    state: string
    postalCode: string
    country: string
    phoneNumber: string
    email: string
    revenueShare: string
    date: string
    signature: string
  }
  owner: {
    firstName: string
    lastName: string
    streetAddress: string
    streetAddressLine2: string
    city: string
    state: string
    postalCode: string
    country: string
    phoneNumber: string
    email: string
    revenueShare: string
    date: string
    signature: string
    position: string
  }
  projectName: string
  legal: {
    governingState: string
    arbitrationBody: string
    arbitrationLocation: string
  }
}



export type FormValueIntellectualPropertyAgreement =
  | string // For primitive string fields (e.g., signer1Email, signer2Email, contractName, etc.)
  | {     // For company and owner address objects
      streetAddress: string;
      streetAddressLine2: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    }
  | {     // For company and owner details
      firstName: string;
      lastName: string;
      phoneNumber: string;
      email: string;
      revenueShare: string;
      date: string;
      signature: string;
      position?: string;  // Optional field for owner only
    }
  | {     // For legal details (governingState, arbitrationBody, arbitrationLocation)
      governingState: string;
      arbitrationBody: string;
      arbitrationLocation: string;
    }
  | null; // For optional/nullable fields like signer1Email, signer2Name, contractName, etc.


export type FormDataLicensingAgreement = {
  signer1Email?: string
  signer1Name?: string
  signer2Email?: string
  signer2Name?: string

  agreement: {
    executionDate: string
    governingState: string
    termDuration: string
    termDurationInNumbers: string
    termType: string
    rateTransactionInNumbers: string
    rateTransactionInWords: string
  }
  licensor: {
    companyName: string
    streetAddress: string
    city: string
    state: string
    postalCode: string
    signature: {
      email: string
      firstName: string
      lastName: string
      position: string
      date: string
    }
  }
  licensee: {
    companyName: string
    typeOfCompany: string
    streetAddress: string
    city: string
    state: string
    postalCode: string
    country: string
    signature: {
      email: string
      firstName: string
      lastName: string
      position: string
      date: string
    }
  }
  software: {
    copyrightProduct: string
  }
  contractName: string
  contractType: string
}


export type FormValueLicensingAgreement =
  | string // For primitive string fields (e.g., agreement executionDate, governingState, contractName, etc.)
  | {     // For nested agreement object fields
      executionDate: string;
      governingState: string;
      termDuration: string;
      termDurationInNumbers: string;
      termType: string;
      rateTransactionInNumbers: string;
      rateTransactionInWords: string;
    }
  | {     // For nested licensor address and signature objects
      companyName: string;
      streetAddress: string;
      city: string;
      state: string;
      postalCode: string;
      signature: {
        email: string
        firstName: string;
        lastName: string;
        position: string;
        date: string;
      };
    }
  | {     // For nested licensee address and signature objects
      companyName: string;
      typeOfCompany: string;
      streetAddress: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
      signature: {
        email: string
        firstName: string;
        lastName: string;
        position: string;
        date: string;
      };
    }
  | {     // For software-related fields
      copyrightProduct: string;
    }
  | null; // For optional/nullable fields (e.g., if any fields are optional)



export type FormDataNonDisclosureAgreement = {
  signer1Email?: string
  signer1Name?: string
  signer2Email?: string
  signer2Name?: string
  contractName?: string

  purposeOfTheWork: string
  disclosingPartyName: string
  disclosingPartyEmail: string
  disclosingPartyStreet: string
  disclosingPartyCity: string
  disclosingPartyState: string
  disclosingPartyPostal: string
  disclosingPartyCountry: string
  disclosingPartySignature: string
  disclosingPartyDate: string
  receivingPartyName: string
  receivingPartyEmail: string
  receivingPartyStreet: string
  receivingPartyCity: string
  receivingPartyState: string
  receivingPartyPostal: string
  receivingPartyCountry: string
  receivingPartySignature: string
  receivingPartyDate: string
}


export type FormValueNonDisclosureAgreement = string;


export type FormDataPromissoryNoteAgreement = {
  signer1Email?: string
  signer1Name?: string
  signer2Email?: string
  signer2Name?: string
  contractName?: string


  date: string
  jurisdiction_state: string
  borrower: {
    firstName: string
    lastName: string
    streetAddress: string
    streetAddressLine2: string
    city: string
    state: string
    postalCode: string
    country: string
    phoneNumber: string
    email: string
    date: string
  }
  lender: {
    firstName: string
    lastName: string
    streetAddress: string
    streetAddressLine2: string
    city: string
    state: string
    postalCode: string
    country: string
    phoneNumber: string
    email: string
    date: string
  }
  principalSum: string
  principalSumInWriting: string
  interestRate: string
  interestRateInNumber: string
  paymentDue: {
    day: string
    month: string
    year: string
  }
}


export type FormValuePromissoryNoteAgreement =
  | string // For primitive string fields (e.g., date, contractName, jurisdiction_state, etc.)
  | {     // For nested borrower and lender address objects
      firstName: string;
      lastName: string;
      streetAddress: string;
      streetAddressLine2: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
      phoneNumber: string;
      email: string;
      date: string;
    }
  | {     // For nested payment due objects
      day: string;
      month: string;
      year: string;
    }
  | null; // For optional/nullable fields


export type FormDataReleaseOfLiabilityAgreement = {
  signer1Email?: string
  signer1Name?: string
  signer2Email?: string
  signer2Name?: string
  contractName?: string

  date: string
  amount: string
  stateName: string
  witnessDate: string
  releasor: {
    firstName: string
    lastName: string
    email: string
    streetAddress: string
    city: string
    state: string
    postalCode: string
    country: string
    signature: string
    signatureDate: string
  }
  releasee: {
    firstName: string
    lastName: string
    email: string
    streetAddress: string
    city: string
    state: string
    postalCode: string
    country: string
    signature: string
    signatureDate: string
  }
}


  export type FormValueReleaseOfLiabilityAgreement =  
  | string  
  | { [key: string]: string }; // For nested objects like `releasor` and `releasee`



export type FormDataRoomRentalAgreement = {
  signer1Email?: string
  signer1Name?: string
  signer2Email?: string
  signer2Name?: string
  contractName?: string

  houseowner: {
    firstName: string
    lastName: string
    email: string
  }
  renter: {
    firstName: string
    lastName: string
    email: string
  }
  address: {
    streetAddress: string
    streetAddressLine2: string
    city: string
    stateProvince: string
    postalCode: string
    country: string
  }
  terms: {
    startDate: string
    noticePeriod: string
    rent: string
    paymentMethod: string
    paymentDay: string
  }
  utilities: {
    gasElectricity: number
    water: number
    garbage: number
    internet: number
    cableTV: number
    otherLiability: number
  }
  fixtures: {
    list: string[]
    depositAmount: string
  }
  governingLaw: {
    state: string
  }
  signatures: {
    renterDate: string
    houseownerDate: string
  }
}


export type FormValueRoomRentalAgreement =
  | string // For primitive string fields (e.g., contractName, startDate, etc.)
  | number // For numeric fields (e.g., gasElectricity, water, etc.)
  | string[] // For list-based fields (e.g., fixtures.list)
  | { [key: string]: string | number | string[] }; // For nested objects



export type FormDataSubscriptionAgreement = {
  signer1Email?: string
  signer1Name?: string
  signer2Email?: string
  signer2Name?: string
  contractName?: string


  date: string
  company: {
    name: string
    streetAddress: string
    streetAddressLine2: string
    city: string
    state: string
    postalCode: string
    country: string
    email: string
    phoneNumber: string
  }
  investor: {
    name: string
    streetAddress: string
    streetAddressLine2: string
    city: string
    state: string
    postalCode: string
    country: string
    email: string
    phoneNumber: string
  }
  subscription: {
    numberOfShares: string
    purchasePrice: string
    paymentPeriod: string
    deliveryPeriod: string
  }
  closing: {
    date: string
  }
  legal: {
    stateCountry: string
    jurisdiction: string
  }
  signatures: {
    company: {
      name: string
      date: string
      signature: string
    }
    investor: {
      name: string
      date: string
      signature: string
    }
  }
}


export type FormValueSubscriptionAgreement =
  | string // For primitive string fields (e.g., date, contractName, purchasePrice, etc.)
  | { [key: string]: string }; // For nested objects (e.g., company, investor, signatures)
