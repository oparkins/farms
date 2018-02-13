require 'rails_helper'

RSpec.describe Version, type: :model do
  it { should belong_to(:project) }
  
  it { should have_one(:version_type).dependent(:destroy) }
  it { should have_many(:oses).dependent(:destroy) }

  it {should validate_presence_of(:gitLink) }
  it {should validate_presence_of(:docLink) }
  it {should validate_presence_of(:ciLink) }
  it {should validate_presence_of(:buildDate) }

end
