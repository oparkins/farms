class Os < ApplicationRecord
  belongs_to :ostypse
  belongs_to :binaries
  belongs_to :supportingDocs
end
