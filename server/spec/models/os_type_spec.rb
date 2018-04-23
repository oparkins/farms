require 'rails_helper'

RSpec.describe OsType, type: :model do
  it { should have_many(:operating_system).dependent(:destroy) }

  it { should validate_presence_of(:name) }

end
