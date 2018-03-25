class Section < ApplicationRecord
  has_many :section_rhythms
  has_many :rhythms, through: :section_rhythms
end
