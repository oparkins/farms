class Project < ApplicationRecord
  belongs_to :division
  belongs_to :lib, optional: true
 
  has_many :versions, dependent: :destroy
  has_many :version_types, dependent: :destroy

  validates_presence_of :name

  after_initialize do |project|
    project.projectLead ||= ""
    project.email ||= ""
  end
  
end
