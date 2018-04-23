require 'rails_helper'

RSpec.describe VersionType, type: :model do
  it { should belong_to(:project) }
  it { should have_many(:version).dependent(:destroy) }

  it { should validate_presence_of(:name) }

end