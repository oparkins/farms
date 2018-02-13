require 'rails_helper'

RSpec.describe VersionType, type: :model do
  it { should belong_to(:project) }
  it { should belong_to(:version) }

  it {should validate_presence_of(:name) }

end
