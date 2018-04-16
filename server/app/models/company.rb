class Company < ApplicationRecord

    after_initialize do |company|
        company.addressLine1 ||= ""
        company.addressLine2 ||= ""
        company.addressCity ||= ""
        company.addressState ||= ""
        company.addressZip ||= ""
        company.logo ||= ""
        company.phone ||= ""
        company.email ||= ""
    end

    
    has_many :divisions, dependent: :destroy

    validates_presence_of :name
end
