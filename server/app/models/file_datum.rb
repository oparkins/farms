class FileDatum < ApplicationRecord
    belongs_to :os

    validates_presence_of :name, :data, :dataHash
end
