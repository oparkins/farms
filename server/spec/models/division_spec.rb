require 'rails_helper'

RSpec.describe Division, type: :model do
  it { should belong_to(:company) }

  it { should have_many(:projects).dependent(:destroy) }

  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:director) }
  it { should validate_presence_of(:divisionLink) }
end
