require 'rails_helper'

RSpec.describe Company, type: :model do
  # Ensure the Company Model has a 1:m relationship with the Division Model
  it { should have_many(:division).dependent(:destroy) }

  #Validation Tests
  #ensure columns are present before saving
  it {should validate_presence_of(:name) }
  it {should validate_presence_of(:addressLine1) }
  it {should validate_presence_of(:addressLine2) }
  it {should validate_presence_of(:addressCity) }
  it {should validate_presence_of(:addressState) }
  it {should validate_presence_of(:addressZip) }
  it {should validate_presence_of(:logo) }
  it {should validate_presence_of(:phone) }
  it {should validate_presence_of(:email) }
end
