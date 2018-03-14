class Version < ApplicationRecord
  belongs_to :project

  has_one :version_type, dependent: :destroy
  has_many :operating_systems, dependent: :destroy
  validates_presence_of :gitLink, :docLink, :ciLink, :buildDate
end