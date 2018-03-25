class Rhythm < ApplicationRecord
  has_many :section_rhythms
  has_many :sections, through: :section_rhythms
end
