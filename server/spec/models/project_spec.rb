require 'rails_helper'

RSpec.describe Project, type: :model do
  it { should belong_to(:division) }
  it { should belong_to(:lib) }

  it { should have_many(:versions).dependent(:destroy) }

  it { should validate_presence_of(:name) }
  
end
