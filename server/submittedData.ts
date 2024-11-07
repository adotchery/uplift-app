interface CompanyData {
    company: any;
    parent: any;
  }
  
  const store: { submittedData: CompanyData | null } = {
    submittedData: null,
  };
  
  export function setSubmittedData(data: CompanyData) {
    store.submittedData = data;
  }
  
  export function getSubmittedData() {
    return store.submittedData;
  }
  