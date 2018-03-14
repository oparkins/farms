require 'rails_helper'

RSpec.describe OsType, type: :model do
  it { should belong_to(:operating_system) }

  it { should validate_presence_of(:name) }

end
