class Version < ApplicationRecord
  belongs_to :project
  belongs_to :version_type
  has_many :operating_systems, dependent: :destroy
  validates_presence_of :buildDate

  after_initialize do |version|
    version.gitLink ||= ""
    version.docLink ||= ""
    version.ciLink ||= ""
  end
end