class OperatingSystem < ApplicationRecord
  belongs_to :version
  has_many :file_data, dependent: :destroy
  has_one :os_type, dependent: :destroy
  has_many :libs, dependent: :destroy
end
