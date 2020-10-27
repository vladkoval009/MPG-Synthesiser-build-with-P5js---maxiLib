#### MPG Sampler ####

The MPG is Goldsmiths' very own cheap rip off version of the popular Akai MPC sampler. If you don't know what an MPC is then watch this https://www.youtube.com/watch?v=QoVOiT5Qs0c (Ignore the chocolate bit!)

Currently the MPG is a bare template.

Luckily by watching the videos, you have just learnt everything you need to know to turn this code into an awesome DJ app.

1. Controlling click. [1 marks]
	- Run the code and try it out.
	- When you press the button at the top left of the grid, you should hear a very fast repeating sound.
	- This sound is stored in the variable `click`
	- Find where `clickBeats` is initialised and replace some of the 1s with 0s so that the click plays once every 4 beats.

2. Adding the next sound [2 marks]
	- Study the code which declares, initialises all of the variables for click
	- Copy and adapt these so that they are ready to create a new sound `beep`
	- Add a line of code in `initAudio` to load `beep.mp3` into the variable `beep`
	- Study the code in `audioLoop` carefully
  - Copy and adapt the all lines of code which are responsible for `click` so that `beep` will now have the same functionality
	- Edit `button_1_Pressed` so that `beep` can be heard when isActive for that button is `true`. HINT: copy and adapt the code in `button_0_Pressed` to do this.
	- Test your `beep` sound. You should be able to turn it on and off using the top center button. Try playing with the 0s and 1s in `beepBeats` to create a rhythm that you like.

3. Add your own sound [1 marks]
	- Find a very short audio sample to work with. Perhaps a bass drum,.
	- You can download the samples from freesounds.org, or rip them from your favourite music - it's okay this isn't for commercial use. Edit the sample in audacity.
	- Follow the same process as above to add your sound. This one should be turned on and off by using the function `button_2_Pressed`

4. Volume slider [1 marks]
	- The slider on the far left would make a perfect master volume control for the output of the MPG.
	- create a global variable called `masterVolume` and initialise it in setup. Its value should be between 0 and 1
	- adapt the code in `audioOut` so that `masterVolume` controls the volume of the output
	- finally add a line of code to `slider_0_Moved` to assign the value of the slider to `masterVolume`

5. Hi-hat with volume control. [1 marks]
	- As before adapt the code to play the sample `hat.mp3`.
	- This time it should be controlled by the middle row button on the far left.
	- You will need to create your own event function for this. Copy and adapt the previous event code to do this.
	- Once the sound is working create a new array underneath your beats array for the sound. Fill this with 16 values with 16 decimal values between 0 and 1. These will control the volume of the hi-hat.
	- In `audioOut` adapt your code which outputs the audio for the hi-hat so that the volume is scaled by the relevant value in the new volume array. HINT: you will need to use playhead to access the correct value.

6. Be creative [4 marks]
These few steps have got you started but now you need to finish the job. Assign samples and functions to the remaining buttons and sliders.

Show off as many of the techniques that you have just learnt as possible. For example you could

	- adjust the playback rates of the samples.
	- add a controllable delay to one of the sounds
	- make one slider adjust the tempo of the playback
	- use the random or sin functions to create variation
	- implement greater control of a sound using objects

NB. I'm not too bothered about musical taste for this exercise, but make sure that the techniques applied are appropriate for the samples you've used.

7. Zip the whole folder to submit.
	- Make sure I can run your code with what you've submitted. Include the libraries and samples. Don't miss anything out !
	- Make sure your samples are small. The upper limit for your uploaded files is 100MB
