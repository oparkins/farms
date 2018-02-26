FactoryBot.define do
    factory :file_datum do 
         name { Faker::Lorem.word }

	 # should probably change to something else, dont have the Faker docu on hand right now
         data { Faker::Address.street_address }
         dataHash { Faker::Internet.email }
    end
end
