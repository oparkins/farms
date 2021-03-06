require 'rails_helper'

RSpec.describe FileDatum, type: :model do
  it { should belong_to(:operating_system) }

  it {should validate_presence_of(:name) }
  it {should validate_presence_of(:data) }
  it {should validate_presence_of(:dataHash) }

end
