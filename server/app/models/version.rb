class Version < ApplicationRecord
  belongs_to :project

  has_one :version_type, dependent: :destroy
  has_many :operating_systems, dependent: :destroy
  validates_presence_of :buildDate

  after_initialize do |version|
    version.gitLink ||= ""
    version.docLink ||= ""
    version.ciLink ||= ""
  end
end