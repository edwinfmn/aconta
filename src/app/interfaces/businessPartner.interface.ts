

export interface BusinessPartner {
  id?: string,
  client: string,
  organization: string,
  active: boolean,
  creationDate: Date,
  createdBy: string,
  updated: Date,
  updatedBy: string,
  searchKey: string,
  name: string,
  businessPartnerCategory: string,
  vendor?: boolean,
  customer?: boolean,
  employee?: boolean
}
