class Project < ApplicationRecord
  belongs_to :division
  belongs_to :lib, optional: true
 
  has_many :versions, dependent: :destroy

  validates_presence_of :name, :projectLead, :email
  
end
