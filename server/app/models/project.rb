class Project < ApplicationRecord
  belongs_to :division
  belongs_to :lib
 
  has_many :versions, dependent: :destroy
  has_many :os_types, dependent: :destroy

  validates_presence_of :name, :projectLead, :email
  
end