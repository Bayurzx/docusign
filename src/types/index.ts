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
    // signer1ClientId: string
    signer2Email: string
    signer2Name: string
    // signer2ClientId: string
    // ccEmail: string
    // ccName: string
    // docFile: File | null | string
    contractName?: string
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
