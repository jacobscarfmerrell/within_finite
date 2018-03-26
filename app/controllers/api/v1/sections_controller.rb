class Api::V1::SectionsController < ApplicationController
  def index
    render json: {
      sections: Section.all,
      rhythms: Rhythm.all,
      section_rhythms: SectionRhythm.all
    }
  end
end
