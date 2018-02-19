FactoryBot.define do
    factory :company do 
         name { Faker::Lorem.word }
         addressLine1 { Faker::Address.street_address }
         addressLine2 { Faker::Address.secondary_address }
         addressCity { Faker::Address.city }
         addressState { Faker::Address.state}
         addressZip { Faker::Address.zip }
         logo { Faker::Internet.url }
         phone { Faker::PhoneNumber.phone_number }
         email { Faker::Internet.email }
    end
end