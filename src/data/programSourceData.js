export let referenceTableStrings = [
` *T01-1 : Category
         0: Synth        3: Brass        6: Key
         1: Lead         4: Strings      7: SE/Voc
         2: Bass         5: Piano        8: User`,


` *T01-2 : Split Key
       0: C-1      16: E0       32: G#1      48: C3       64: E4       80: G#5      96: C7      112: E8
       1: C#-1     17: F0       33: A1       49: C#3      65: F4       81: A5       97: C#7     113: F8
       2: D-1      18: F#0      34: A#1      50: D3       66: F#4      82: A#5      98: D7      114: F#8
       3: D#-1     19: G0       35: B1       51: D#3      67: G4       83: B5       99: D#7     115: G8
       4: E-1      20: G#0      36: C2       52: E3       68: G#4      84: C6      100: E7      116: G#8
       5: F-1      21: A0       37: C#2      53: F3       69: A4       85: C#6     101: F7      117: A8
       6: F#-1     22: A#0      38: D2       54: F#3      70: A#4      86: D6      102: F#7     118: A#8
       7: G-1      23: B0       39: D#2      55: G3       71: B4       87: D#6     103: G7      119: B8
       8: G#-1     24: C1       40: E2       56: G#3      72: C5       88: E6      104: G#7     120: C9
       9: A-1      25: C#1      41: F2       57: A3       73: C#5      89: F6      105: A7      121: C#9
      10: A#-1     26: D1       42: F#2      58: A#3      74: D5       90: F#6     106: A#7     122: D9
      11: B-1      27: D#1      43: G2       59: B3       75: D#5      91: G6      107: B7      123: D#9
      12: C0       28: E1       44: G#2      60: C4       76: E5       92: G#6     108: C8      124: E9
      13: C#0      29: F1       45: A2       61: C#4      77: F5       93: A6      109: C#8     125: F9
      14: D0       30: F#1      46: A#2      62: D4       78: F#5      94: A#6     110: D8      126: F#9
      15: D#0      31: G1       47: B2       63: D#4      79: G5       95: B6      111: D#8     127: G9`,


` *T02-1 : Vibrato Int
                  -48: +1200   -32: -0800,  -16: -0160,    0: +0000,  +16: +0160,  +32: +0800,  +48: +1200,
     -63: -2400,  -47: -1175,  -31: -0775,  -15: -0120,   +1: +0001,  +17: +0200,  +33: +0825,  +49: +1280,
     -62: -2320,  -46: -1150,  -30: -0750,  -14: -0100,   +2: +0002,  +18: +0260,  +34: +0850,  +50: +1360,
     -61: -2240,  -45: -1125,  -29: -0725,  -13: -0080,   +3: +0003,  +19: +0320,  +35: +0875,  +51: +1440,
     -60: -2160,  -44: -1100,  -28: -0700,  -12: -0060,   +4: +0004,  +20: +0380,  +36: +0900,  +52: +1520,
     -59: -2080,  -43: -1075,  -27: -0675,  -11: -0040,   +5: +0005,  +21: +0440,  +37: +0925,  +53: +1600,
     -58: -2000,  -42: -1050,  -26: -0650,  -10: -0030,   +6: +0010,  +22: +0500,  +38: +0950,  +54: +1680,
     -57: -1920,  -41: -1025,  -25: -0625,   -9: -0025,   +7: +0015,  +23: +0550,  +39: +0975,  +55: +1760,
     -56: -1840,  -40: -1000,  -24: -0600,   -8: -0020,   +8: +0020,  +24: +0600,  +40: +1000,  +56: +1840,
     -55: -1760,  -39: -0975,  -23: -0550,   -7: -0015,   +9: +0025,  +25: +0625,  +41: +1025,  +57: +1920,
     -54: -1680,  -38: -0950,  -22: -0500,   -6: -0010,  +10: +0030,  +26: +0650,  +42: +1050,  +58: +2000,
     -53: -1600,  -37: -0925,  -21: -0440,   -5: -0005,  +11: +0040,  +27: +0675,  +43: +1075,  +59: +2080,
     -52: -1520,  -36: -0900,  -20: -0380,   -4: -0004,  +12: +0060,  +28: +0700,  +44: +1100,  +60: +2160,
     -51: -1440,  -35: -0875,  -19: -0320,   -3: -0003,  +13: +0080,  +29: +0725,  +45: +1125,  +61: +2240,
     -50: -1360,  -34: -0850,  -18: -0260,   -2: -0002,  +14: +0100,  +30: +0750,  +46: +1150,  +62: +2320,
     -49: -1280,  -33: -0825,  -17: -0200,   -1: -0001,  +15: +0120,  +31: +0775,  +47: +1175,  +63: +2400`,

` *T02-2 : Filter Type
       0: LPF King 1   5: LPF MS-20    10: HPF MS-20   15: BPF MS-20
       1: LPF King 2   6: LPF Acid     11: HPF Acid    16: BPF Acid
       2: LPF MG       7: HPF King     12: BPF King    17: BPF King
       3: LPF P5       8: HPF P5       13: BPF P5
       4: LPF OB       9: HPF OB       14: BPF OB`,

` *T02-3 : Filter Keyboard Track
                  -48: -1.00,  -32: -0.66,  -16: -0.33,    0: +0.00,  +16: +0.33,  +32: +0.66,  +48: +1.00,
     -63: -2.00,  -47: -0.97,  -31: -0.64,  -15: -0.31,   +1: +0.02,  +17: +0.35,  +33: +0.68,  +49: +1.06,
     -62: -1.93,  -46: -0.95,  -30: -0.62,  -14: -0.29,   +2: +0.04,  +18: +0.37,  +34: +0.70,  +50: +1.13,
     -61: -1.86,  -45: -0.93,  -29: -0.60,  -13: -0.27,   +3: +0.06,  +19: +0.39,  +35: +0.72,  +51: +1.20,
     -60: -1.80,  -44: -0.91,  -28: -0.58,  -12: -0.25,   +4: +0.08,  +20: +0.41,  +36: +0.75,  +52: +1.26,
     -59: -1.73,  -43: -0.89,  -27: -0.56,  -11: -0.22,   +5: +0.10,  +21: +0.43,  +37: +0.77,  +53: +1.33,
     -58: -1.66,  -42: -0.87,  -26: -0.54,  -10: -0.20,   +6: +0.12,  +22: +0.45,  +38: +0.79,  +54: +1.40,
     -57: -1.60,  -41: -0.85,  -25: -0.52,   -9: -0.18,   +7: +0.14,  +23: +0.47,  +39: +0.81,  +55: +1.46,
     -56: -1.53,  -40: -0.83,  -24: -0.50,   -8: -0.16,   +8: +0.16,  +24: +0.50,  +40: +0.83,  +56: +1.53,
     -55: -1.46,  -39: -0.81,  -23: -0.47,   -7: -0.14,   +9: +0.18,  +25: +0.52,  +41: +0.85,  +57: +1.60,
     -54: -1.40,  -38: -0.79,  -22: -0.45,   -6: -0.12,  +10: +0.20,  +26: +0.54,  +42: +0.87,  +58: +1.66,
     -53: -1.33,  -37: -0.77,  -21: -0.43,   -5: -0.10,  +11: +0.22,  +27: +0.56,  +43: +0.89,  +59: +1.73,
     -52: -1.26,  -36: -0.75,  -20: -0.41,   -4: -0.08,  +12: +0.25,  +28: +0.58,  +44: +0.91,  +60: +1.80,
     -51: -1.20,  -35: -0.72,  -19: -0.39,   -3: -0.06,  +13: +0.27,  +29: +0.60,  +45: +0.93,  +61: +1.86,
     -50: -1.13,  -34: -0.70,  -18: -0.37,   -2: -0.04,  +14: +0.29,  +30: +0.62,  +46: +0.95,  +62: +1.93,
     -49: -1.06,  -33: -0.68,  -17: -0.35,   -1: -0.02,  +15: +0.31,  +31: +0.64,  +47: +0.97,  +63: +2.00`,

` *T02-4 : [kHz]
       0: 0.01     16: 0.17     32: 0.83     48: 2.75     64: 4.75     80: 8.50     96: 15.0    112: 39.0
       1: 0.02     17: 0.18     33: 0.92     49: 2.88     65: 4.88     81: 8.75     97: 16.0    113: 41.0
       2: 0.03     18: 0.19     34: 1.00     50: 3.00     66: 5.00     82: 9.00     98: 17.0    114: 44.0
       3: 0.04     19: 0.20     35: 1.13     51: 3.13     67: 5.25     83: 9.25     99: 18.0    115: 47.0
       4: 0.05     20: 0.21     36: 1.25     52: 3.25     68: 5.50     84: 9.50    100: 19.0    116: 50.0
       5: 0.06     21: 0.22     37: 1.38     53: 3.38     69: 5.75     85: 9.75    101: 20.0    117: 53.0
       6: 0.07     22: 0.23     38: 1.50     54: 3.50     70: 6.00     86: 10.0    102: 21.5    118: 57.0
       7: 0.08     23: 0.24     39: 1.63     55: 3.63     71: 6.25     87: 10.5    103: 23.0    119: 61.0
       8: 0.09     24: 0.25     40: 1.75     56: 3.75     72: 6.50     88: 11.0    104: 24.5    120: 65.0
       9: 0.10     25: 0.29     41: 1.88     57: 3.88     73: 6.75     89: 11.5    105: 26.0    121: 70.0
      10: 0.11     26: 0.33     42: 2.00     58: 4.00     74: 7.00     90: 12.0    106: 27.5    122: 75.0
      11: 0.12     27: 0.42     43: 2.13     59: 4.13     75: 7.25     91: 12.5    107: 29.0    123: 80.0
      12: 0.13     28: 0.50     44: 2.25     60: 4.25     76: 7.50     92: 13.0    108: 31.0    124: 85.0
      13: 0.14     29: 0.58     45: 2.38     61: 4.38     77: 7.75     93: 13.5    109: 33.0    125: 90.0
      14: 0.15     30: 0.67     46: 2.50     62: 4.50     78: 8.00     94: 14.0    110: 35.0    126: 95.0
      15: 0.16     31: 0.75     47: 2.63     63: 4.63     79: 8.25     95: 14.5    111: 37.0    127: 100`,

` *T02-5 :
       0: 8/1       4: 3/4       8: 1/4      12: 1/12     16: 1/64
       1: 4/1       5: 1/2       9: 3/16     13: 1/16
       2: 2/1       6: 3/8      10: 1/6      14: 1/24
       3: 1/1       7: 1/3      11: 1/8      15: 1/32`,

` *T04-1 : PRE FX TYPE
       0: DISTORTION   3: EP.AMP
       1: DECIMATOR    4: GT.AMP
       2: RING MOD     5: TONE`,

` *T04-2 : MOD FX TYPE
       0: FLANGER      3: TREMOLO
       1: CHORUS       4: PHASER
       2: U-VIBE       5: ROTARY`,

` *T04-3 : REV/DELAY TYPE
       0: HALL         3: TAPE ECHO
       1: ROOM         4: MOD DELAY
       2: PLATE        5: BPM DELAY`,

` *T05-1 : Fc Mod Source, Virtual Patch1~6 Source
       0: EG1          4: Velocity     8: Key Track
       1: EG2          5: Pitch Bend   9: MIDI1
       2: LFO1         6: JS+Y        10: MIDI2
       3: LFO2         7: JS-Y        11: MIDI3`,

` *T06-1 : Arp Type
       0: Up
       1: Down
       2: Alt1
       3: Alt2
       4: Random
       5: Trigger`,

` *T06-2 : Arp Resolution
       0: 1/32      3: 1/12      6: 1/4
       1: 1/24      4: 1/8       7: 1/2
       2: 1/16      5: 1/6       8: 1/1`,

` *T07-3 : OSC Type
     0: Off           32: VPM Sine      64: Digital 1     96: Syn Vox 2
     1: Saw           33: Syn Sine 1    65: Digital 2     97: A.Piano
     2: Pulse         34: Syn Sine 2    66: Digital 3     98: E.Grand
     3: Triangle      35: Syn Sine 3    67: Digital 4     99: Tine EP
     4: Sine          36: Syn Sine 4    68: Digital 5    100: Dyno EP
     5: White Noise   37: Syn Sine 5    69: Digital 6    101: Wurly EP
     6: Pink Noise    38: Syn Sine 6    70: Digital 7    102: Clav 1
     7: Blue Noise    39: Syn Sine 7    71: Digital 8    103: Clav 2
     8: Res. Noise    40: Syn Sine 8    72: Digital 9    104: Organ 1
     9: Dual Saw      41: Syn Sine 9    73: E.Piano 1    105: Organ 2
    10: Dual Square   42: Syn Wave 1    74: E.Piano 2    106: Organ 3
    11: Dual Tri.     43: Syn Wave 2    75: E.Piano 3    107: M1 Organ
    12: Dual Sine     44: Syn Wave 3    76: E.Piano 4    108: Vox Organ
    13: Unison Saw    45: Syn Wave 4    77: Organ 1      109: Marimba
    14: Unison Squ.   46: Syn Wave 5    78: Organ 2      110: Bell 1
    15: Unison Tri.   47: Syn Wave 6    79: Organ 3      111: Bell 2
    16: Unison Sine   48: Syn Wave 7    80: Organ 4      112: Tape Flute
    17: Sync Saw      49: Syn Wire 1    81: Organ 5      113: Brass 1
    18: Sync Square   50: Syn Wire 2    82: Organ 6      114: Brass 2
    19: Sync Tri.     51: Syn Wire 3    83: Organ 7      115: Trumpet
    20: Sync Sine     52: Syn Wire 4    84: Clav 1       116: Strings
    21: Ring Saw      53: 5th Saw       85: Clav 2       117: Tape Str.
    22: Ring Square   54: 5th Square    86: Guitar 1     118: Choir 1
    23: Ring Tri.     55: Inharm 1      87: Guitar 2     119: Choir 2
    24: Ring Sine     56: Inharm 2      88: E.Bass 1     120: Choir 3
    25: XMod Saw      57: Inharm 3      89: E.Bass 2     121: A.Guitar
    26: XMod Square   58: Inharm 4      90: E.Bass 3     122: E.Guitar
    27: XMod Tri.     59: Inharm 5      91: Bell 1       123: A.Bass
    28: XMod Sine     60: Inharm 6      92: Bell 2       124: E.Bass 1
    29: VPM Saw       61: Inharm 7      93: Bell 3       125: E.Bass 2
    30: VPM Square    62: Inharm 8      94: Bell 4       126: E.Bass 3
    31: VPM Tri.      63: Inharm 9      95: Syn Vox 1    127: Mic In`,

` *T09-1 : Patch1~6 Destination
       0: Off              10: OSC2 Control2   20: EG2 Decay       30: Panpot          40: Rev/Delay Depth
       1: Pitch            11: OSC3 Control2   21: EG2 Sustain     31: Patch1 Int.     41: Rev/Delay Time
       2: Portamento       12: OSC1 Level      22: EG2 Release     32: Patch2 Int.
       3: OSC1 Tune        13: OSC2 Level      23: EG2 Attack      33: Patch3 Int.
       4: OSC2 Tune        14: OSC3 Level      24: EG2 Decay       34: Patch4 Int.
       5: OSC3 Tune        15: Filt Cutoff     25: EG2 Sustain     35: Patch5 Int.
       6: OSC1 Control1    16: Filt Reso       26: EG2 Release     36: Patch6 Int.
       7: OSC2 Control1    17: Filt EG1Int     27: LFO1 Freq.      37: PreFx Drive
       8: OSC3 Control1    18: Filt KeyTrack   28: LFO2 Freq.      38: ModFx Depth
       9: OSC1 Control2    19: EG1 Attack      29: Amp Level       39: ModFx Speed`,

` *T10-1 :
       0: Equal Temp   5: Werckmeist
       1: Pure Major   6: Kirnberger
       2: Pure Minor   7: Slendoro
       3: Arabic       8: Pelog
       4: Pythagorea   9: UserKeyTune`,

` *T10-2 :
       0: Off          3: Pink         6: Purple
       1: White        4: Blue         7: Gold
       2: Red          5: Green        8: Fickle`,

` *T10-3 :
       0: P.Bend
       1: A.Touch
       2~97: #CC 000~095
       98~115: #CC 102~119
       116: #CC16+/-
       117: #CC17+/-
       118: #CC19+/-
       119: #CC20+/-
       120: #CC21+/-`,

` *T10-4 :
        0: Portamento            29: LFO1 Intensity        58: Vocoder Resonance
        1: Portamento SW         30: LFO1 Frequency        59: Vocoder Fc Mod.Int
        2: Unison SW             31: LFO2 Intensity        60: Vocoder E.F. Sens
        3: OSC1 Type             32: LFO2 Frequency
        4: OSC1 Control1         33: Patch1 Int.
        5: OSC1 Control2         34: Patch2 Int.
        6: OSC2 Type             35: Patch3 Int.
        7: OSC2 Control1         36: Patch4 Int.
        8: OSC2 Control2         37: Patch5 Int.
        9: OSC3 Type             38: Patch6 Int.
       10: OSC3 Control1         39: EQ Hi.Gain
       11: OSC3 Control2         40: EQ Low.Gain
       12: OSC1 Level            41: PreFx Drive
       13: OSC2 Level            42: ModFx Depth
       14: OSC3 Level            43: ModFx Speed
       15: Filter Cutoff         44: Rev/Delay time
       16: Filter Resonance      45: PreFx SW
       17: Filter EG1 Int        46: ModFx SW
       18: Filter KeyTrack       47: Rev/Delay Depth
       19: Amp Level             48: Rev/Delay SW
       20: Panpot                49: Vocoder Threshold
       21: EG1 Attack            50: Vocoder HPF Level
       22: EG1 Decay             51: Vocoder HPF Gate
       23: EG1 Sustain           52: Vocoder Direct Level
       24: EG1 Release           53: Vocoder In TimbreA Level
       25: EG2 Attack            54: Vocoder In TimbreB Level
       26: EG2 Decay             55: Vocoder Level
       27: EG2 Sustain           56: Vocoder Formant Shift
       28: EG2 Release           57: Vocoder FC Offset`,

` *T10-5 :
       0: Volume           4: JS +Y
       1: Exp.Pedal        5: JS -Y
       2: Panpot           6: Foot Pedal
       3: AfterTouch`,

` *T10-6 :
       0: Program Up       4: Portamento SW    8: JS Lock X
       1: Program Down     5: Arp SW           9: JS Lock Y
       2: Octave Up        6: Arp Stop         10: JS Lock XY
       3: Octave Down      7: Foot SW`,

` *T10-7 :
       0: 20       10: 63       20: 200      30: 710
       1: 22       11: 71       21: 224      31: 800
       2: 25       12: 80       22: 250      32: 900
       3: 28       13: 90       23: 280      33: 1000
       4: 32       14: 10       24: 315
       5: 36       15: 11       25: 400
       6: 40       16: 12       26: 450
       7: 45       17: 14       27: 500
       8: 50       18: 16       28: 560
       9: 56       19: 18       29: 630`,

` *T10-8 :
       0: 1.00     10: 3.15     20: 11.2
       1: 1.12     11: 4.00     21: 12.5
       2: 1.25     12: 4.50     22: 14.0
       3: 1.40     13: 5.00     23: 16.0
       4: 1.60     14: 5.60     24: 18.0
       5: 1.80     15: 6.30     25: 20.0
       6: 2.00     16: 7.10
       7: 2.24     17: 8.00
       8: 2.50     18: 9.00
       9: 2.80     19: 10.0`
];

// TODO: create ref table for these and generats
// CTRL1 and CTRL2 needs a solution
export let oscTypeRawDictionary = [
  // NAME          CTRL1 Name      CTRL1 Lookup    CTRL2 Name           CTRL2 Lookup    CATEGORY
  "Off             -               -               -                                    ",
  "Saw             Waveform        0~127           -                                    Analog",
  "Pulse           PulseWidth      0~127           -                                    Analog",
  "Triangle        Waveform        0~127           -                                    Analog",
  "Sine            Waveform        0~127           -                                    Analog",
  "White Noise     Decimator Fc    0~127           Noise Decay          0~127           Analog",
  "Pink Noise      LPF Cutoff      0~127           Noise Decay          0~127           Analog",
  "Blue Noise      HPF Cutoff      0~127           Noise Decay          0~127           Analog",
  "Res. Noise      Resonance       0~127           Noise Decay          0~127           Analog",
  "Dual Saw        Detune          -63~0~63        -                    -               Analog",
  "Dual Square     Detune          -63~0~63        -                    -               Analog",
  "Dual Tri.       Detune          -63~0~63        -                    -               Analog",
  "Dual Sine       Detune          -63~0~63        -                    -               Analog",
  "Unison Saw      Detune          -63~0~63        -                    -               Analog",
  "Unison Squ.     Detune          -63~0~63        -                    -               Analog",
  "Unison Tri.     Detune          -63~0~63        -                    -               Analog",
  "Unison Sine     Detune          -63~0~63        -                    -               Analog",
  "Sync Saw        Mod Pitch       0~127           -                    -               Analog",
  "Sync Square     Mod Pitch       0~127           -                    -               Analog",
  "Sync Tri.       Mod Pitch       0~127           -                    -               Analog",
  "Sync Sine       Mod Pitch       0~127           -                    -               Analog",
  "Ring Saw        Mod Pitch       -63~0~63        -                    -               Analog",
  "Ring Square     Mod Pitch       -63~0~63        -                    -               Analog",
  "Ring Tri.       Mod Pitch       -63~0~63        -                    -               Analog",
  "Ring Sine       Mod Pitch       -63~0~63        -                    -               Analog",
  "XMod Saw        Mod Depth       0~127           Mod Pitch            -63~0~63        Analog",
  "XMod Square     Mod Depth       0~127           Mod Pitch            -63~0~63        Analog",
  "XMod Tri.       Mod Depth       0~127           Mod Pitch            -63~0~63        Analog",
  "XMod Sine       Mod Depth       0~127           Mod Pitch            -63~0~63        Analog",
  "VPM Saw         Mod Depth       0~127           Mod Harm             0~32            Analog",
  "VPM Square      Mod Depth       0~127           Mod Harm             0~32            Analog",
  "VPM Tri.        Mod Depth       0~127           Mod Harm             0~32            Analog",
  "VPM Sine        Mod Depth       0~127           Mod Harm             0~32            Analog",
  "Syn Sine 1      Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Syn Sine 2      Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Syn Sine 3      Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Syn Sine 4      Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Syn Sine 5      Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Syn Sine 6      Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Syn Sine 7      Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Syn Sine 8      Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Syn Sine 9      Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Syn Wave 1      Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Syn Wave 2      Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Syn Wave 3      Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Syn Wave 4      Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Syn Wave 5      Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Syn Wave 6      Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Syn Wave 7      Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Syn Wire 1      Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Syn Wire 2      Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Syn Wire 3      Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Syn Wire 4      Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "5th Saw         Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "5th Square      Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Inharm 1        Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Inharm 2        Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Inharm 3        Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Inharm 4        Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Inharm 5        Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Inharm 6        Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Inharm 7        Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Inharm 8        Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Inharm 9        Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Digital 1       Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Digital 2       Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Digital 3       Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Digital 4       Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Digital 5       Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Digital 6       Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Digital 7       Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Digital 8       Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Digital 9       Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "E.Piano 1       Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "E.Piano 2       Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "E.Piano 3       Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "E.Piano 4       Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Organ 1         Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Organ 2         Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Organ 3         Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Organ 4         Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Organ 5         Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Organ 6         Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Organ 7         Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Clav 1          Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Clav 2          Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Guitar 1        Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Guitar 2        Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "E.Bass 1        Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "E.Bass 2        Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "E.Bass 3        Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Bell 1          Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Bell 2          Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Bell 3          Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Bell 4          Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Syn Vox 1       Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "Syn Vox 2       Detune          -63~0~63        Mod Depth            0~127           DWGS",
  "A.Piano         -               -               -                    -               PCM",
  "E.Grand         -               -               -                    -               PCM",
  "Tine EP         -               -               -                    -               PCM",
  "Dyno EP         -               -               -                    -               PCM",
  "Wurly EP        -               -               -                    -               PCM",
  "Clav 1          -               -               -                    -               PCM",
  "Clav 2          -               -               -                    -               PCM",
  "Organ 1         -               -               -                    -               PCM",
  "Organ 2         -               -               -                    -               PCM",
  "Organ 3         -               -               -                    -               PCM",
  "M1 Organ        -               -               -                    -               PCM",
  "Vox Organ       -               -               -                    -               PCM",
  "Marimba         -               -               -                    -               PCM",
  "Bell 1          -               -               -                    -               PCM",
  "Bell 2          -               -               -                    -               PCM",
  "Tape Flute      -               -               -                    -               PCM",
  "Brass 1         -               -               -                    -               PCM",
  "Brass 2         -               -               -                    -               PCM",
  "Trumpet         -               -               -                    -               PCM",
  "Strings         -               -               -                    -               PCM",
  "Tape Str.       -               -               -                    -               PCM",
  "Choir 1         -               -               -                    -               PCM",
  "Choir 2         -               -               -                    -               PCM",
  "Choir 3         -               -               -                    -               PCM",
  "A.Guitar        -               -               -                    -               PCM",
  "E.Guitar        -               -               -                    -               PCM",
  "A.Bass          -               -               -                    -               PCM",
  "E.Bass 1        -               -               -                    -               PCM",
  "E.Bass 2        -               -               -                    -               PCM",
  "E.Bass 3        -               -               -                    -               PCM",
  "Mic In          Gain            -63~0~63        -                    -               MIC IN"
];
