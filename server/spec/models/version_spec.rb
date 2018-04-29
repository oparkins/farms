require 'rails_helper'

RSpec.describe Version, type: :model do
  it { should belong_to(:project) }
  
  it { should belong_to(:version_type) }
  it { should have_many(:operating_systems).dependent(:destroy) }

  it {should validate_presence_of(:buildDate) }

end
