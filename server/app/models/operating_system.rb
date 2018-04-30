class OperatingSystem < ApplicationRecord
  belongs_to :version
  belongs_to :os_type
  has_many :file_data, dependent: :destroy
  has_many :libs, dependent: :destroy
end
