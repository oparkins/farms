class Company < ApplicationRecord
    has_many :divisions, dependent: :destroy

    validates_presence_of :name, :addressLine1, :addressLine2, :addressCity, :addressState, :addressZip, :logo, :phone, :email
end
