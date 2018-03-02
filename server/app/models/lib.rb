class Lib < ApplicationRecord
  belongs_to :os
  has_many :dependencies, dependent: :destroy
  validates_presence_of :name, :verify, :link
end
