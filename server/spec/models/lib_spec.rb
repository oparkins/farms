require 'rails_helper'

RSpec.describe Lib, type: :model do
  it { should belong_to(:operating_system) }
  
  it { should have_one(:project).dependent(:destroy) }

  it { should validate_presence_of(:name) }
end
