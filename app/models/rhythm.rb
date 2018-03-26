class Rhythm < ApplicationRecord
  has_many :section_rhythms
  has_many :sections, through: :section_rhythms

  has_many :rhythm_chords
  has_many :chords, through: :rhythm_chords
end
