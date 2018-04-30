require 'rails_helper'

RSpec.describe OperatingSystem, type: :model do
  it { should belong_to(:version) }
  
  it { should have_many(:file_data).dependent(:destroy) }
  it { should belong_to(:os_type) }
  it { should have_many(:libs).dependent(:destroy) }
end