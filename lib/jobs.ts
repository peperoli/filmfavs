export const jobs = {
  directing: [
    { name: 'Director', value: ['Director'] },
    {
      name: 'Assistant Director',
      value: ['Assistant Director', 'First Assistant Director', 'Second Assistand Director'],
    },
  ],
  production: [
    { name: 'Producer', value: ['Producer'] },
    { name: 'Executive Producer', value: ['Executive Producer'] },
    { name: 'Casting', value: ['Casting'] },
  ],
  writing: [
    { name: 'Writer', value: ['Writer'] },
    { name: 'Screenplay', value: ['Screenplay'] },
    { name: 'Story', value: ['Story'] },
    { name: 'Novel', value: ['Novel', 'Graphic Novel', 'Author'] },
    { name: 'Comic Book', value: ['Comic Book'] },
    { name: 'Characters', value: ['Characters'] },
  ],
  camera: [
    { name: 'Director of Photography', value: ['Director of Photography'] },
    {
      name: 'Camera Operator',
      value: [
        'Camera Operator',
        '"A" Camera Operator',
        '"B" Camera Operator',
        'Steadicam Operator',
      ],
    },
  ],
  sound: [
    {
      name: 'Composer',
      value: ['Original Music Composer', 'Main Title Theme Composer'],
    },
    { name: 'Singer', value: ['Songs'] },
    {
      name: 'Musician',
      value: [
        'Music',
        'Musician',
        'Music Editor',
        'Music Supervisor',
        'Music Producer',
        'Music Arranger',
      ],
    },
    { name: 'Sound Designer', value: ['Sound Designer'] },
    { name: 'Sound Mixer', value: ['Sound Re-Recording Mixer', 'Sound Mixer'] },
    {
      name: 'Sound Editor',
      value: ['Sound Editor', 'Supervising Sound Editor', 'Sound Effects Editor'],
    },
    { name: 'Foley', value: ['Foley', 'Foley Artist', 'Foley Editor'] },
    { name: 'ADR', value: ['ADR Mixer', 'ADR Recordist', 'ADR Editor'] },
    { name: 'Dialogue Editor', value: ['Dialogue Editor'] },
  ],
} as { [key: string]: { name: string; value: string[] }[] }
