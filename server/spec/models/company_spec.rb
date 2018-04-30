require 'rails_helper'

RSpec.describe Company, type: :model do
  # Ensure the Company Model has a 1:m relationship with the Division Model
  it { should have_many(:divisions).dependent(:destroy) }

  #Validation Tests
  #ensure columns are present before saving
  it {should validate_presence_of(:name) }
end
