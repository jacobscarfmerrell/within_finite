class CreateSectionRhythms < ActiveRecord::Migration[5.1]
  def change
    create_table :section_rhythms do |t|
      t.belongs_to :section
      t.belongs_to :rhythm
    end
  end
end
