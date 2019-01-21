# Xcode Test for iOS

## Runs Xcode's `test` action on an iOS project.


Runs Xcode's `test` action on an iOS project.



Write the tests and run them on every build just to make sure those tiny code goblins didn't put something in the code that shouldn't be there while you were at the daily Scrum meeting.

### Inputs:

### project_path = `$BITRISE_PROJECT_PATH`

##### Project (or Workspace) path


A `.xcodeproj` or `.xcworkspace` path, relative to the Working directory (if specified).

##### Required


`true`

### scheme = `$BITRISE_SCHEME`

##### Scheme name


The Scheme to use.



**IMPORTANT**: The Scheme has to be marked as __shared__ in Xcode!

##### Required


`true`

### simulator_device = `iPhone 6s Plus`

##### Device


Set it as it is shown in Xcode's device selection dropdown UI.



A couple of examples (the actual available options depend on which versions are installed):



* iPhone 6

* iPhone 6 Plus

* iPad

* iPad Air

* Apple TV 1080p (don't forget to set the platform to `tvOS Simulator` to use this option!)

##### Required


`true`

### simulator_os_version = `latest`

##### OS version


Set it as it is shown in Xcode's device selection dropdown UI.



A couple of format examples (the actual available options depend on which versions are installed):



* 8.4

* latest

##### Required


`true`

### simulator_platform = `iOS Simulator`

##### Platform


Set it as it is shown in Xcode's device selection dropdown UI.



A couple of examples (the actual available options depend on which versions are installed):



* iOS Simulator

* tvOS Simulator

##### Required


`true`

##### Value options:


`iOS Simulator` `tvOS Simulator`

### export_uitest_artifacts = `false`

##### Export UITest Artifacts


If enabled, the attachments of the UITest will be exported into the BITRISE_DEPLOY_DIR, as a compressed ZIP file.

Attachments include screenshots taken during the UI test, and other artifacts.

##### Required


`false`

##### Value options:


`true` `false`

### generate_code_coverage_files = `no`

##### Generate code coverage files?


In case of `generate_code_coverage_files: "yes"` `xcodebuild` gets two additional flags:



* GCC_INSTRUMENT_PROGRAM_FLOW_ARCS=YES

* GCC_GENERATE_TEST_COVERAGE_FILES=YES

##### Required


`true`

##### Value options:


`yes` `no`

### verbose = `no`

##### Enable verbose log?


You can enable the verbose log for easier debugging.

##### Category


Debug

##### Required


`false`

##### Value options:


`yes` `no`

### headless_mode = `yes`

##### Run the test in headless mode?

##### Summary


In headless mode the simulator is not launched in the foreground.


If you run your tests in headless mode the xcodebuild will start a simulator in a background.

In headless mode the simulator will not be visible but your tests (even the screenshots) will run just like if you run a simulator in foreground.



**NOTE:** Headless mode is available with Xcode 9.x or newer.

##### Category


Debug

##### Required


`false`

##### Value options:


`yes` `no`

### workdir = `$BITRISE_SOURCE_DIR`

##### Working directory


Working directory of the step.

You can leave it empty to leave the working directory unchanged.

##### Category


Debug

##### Required


`false`

### is_clean_build = `no`

##### Do a clean Xcode build before testing?

##### Category


Debug

##### Required


`true`

##### Value options:


`yes` `no`

### output_tool = `xcpretty`

##### Output tool


If output_tool is set to xcpretty, the xcodebuild output will be prettified by xcpretty.

If output_tool is set to xcodebuild, the raw xcodebuild output will be printed.

##### Category


Debug

##### Required


`true`

##### Value options:


`xcpretty` `xcodebuild`

### xcodebuild_test_options = ``

##### Additional options for `xcodebuild build test` call


Options added to the end of the `xcodebuild build test` call.



If you leave empty this input, xcodebuild will be called as:



`xcodebuild

  -project\-workspace PROJECT.xcodeproj\WORKSPACE.xcworkspace

  -scheme SCHEME

  build test

  -destination platform=PLATFORM Simulator,name=NAME,OS=VERSION`



In case of `generate_code_coverage_files: "yes"` `xcodebuild` gets two additional flags:



* GCC_INSTRUMENT_PROGRAM_FLOW_ARCS=YES

* GCC_GENERATE_TEST_COVERAGE_FILES=YES



If you want to add more options, list that separated by space character.

Example: `-xcconfig PATH -verbose`

##### Category


Debug

##### Required


`false`

### single_build = `true`

##### Run xcodebuild test only


If `single_build` is set to false, the step runs `xcodebuild OPTIONS build OPTIONS` before the test 

to generate the project derived data. After that comes `xcodebuild OPTIONS build test OPTIONS`. This command's log is presented in the step's log.



If `single_build` is set to true, then the step calls only `xcodebuild OPTIONS build test OPTIONS`.

##### Category


Debug

##### Required


`false`

##### Value options:


`true` `false`

### should_build_before_test = `yes`

##### (Experimental) Explicitly perform a build before testing?


Previous Xcode versions and configurations may throw the error `iPhoneSimulator: Timed out waiting 120 seconds for simulator to boot, current state is 1.`

when the compilation before performing the tests takes too long.



This is fixed by running `xcodebuild OPTIONS build test OPTIONS` instead of `xcodebuild OPTIONS test OPTIONS`.

Calling an explicit build before the test results in the code being compiled twice, thus creating an overhead.



Unless you are sure that your configuration is not prone to this error, it is recommended to leave this option turned on.

##### Category


Debug

##### Required


`true`

##### Value options:


`yes` `no`

### should_retry_test_on_fail = `no`

##### (Experimental) Rerun test, when it fails?


If `should_retry_test_on_fail: yes` step will retry the test if first attempt failed.

##### Category


Debug

##### Required


`true`

##### Value options:


`yes` `no`

### xcpretty_test_options = `--color --report html --output "${BITRISE_DEPLOY_DIR}/xcode-test-results-${BITRISE_SCHEME}.html"`

##### Additional options for `xcpretty` test call


Options added to the end of the `xcpretty` test call.



If you leave empty this input, xcpretty will be called as:



`set -o pipefail && XCODEBUILD_TEST_COMMAND | xcpretty`



In case of leaving this input on default value:



`set -o pipefail && XCODEBUILD_TEST_COMMAND | xcpretty --color --report html --color --report html --output "${BITRISE_DEPLOY_DIR}/xcode-test-results-${BITRISE_SCHEME}.html"



If you want to add more options, list that separated by space character.

##### Category


Debug

##### Required


`false`

### Output:

### BITRISE_XCODE_TEST_RESULT = `null`

##### Result of the tests. 'succeeded' or 'failed'.

##### Required


`false`

##### Value options:


`succeeded` `failed`

### BITRISE_XCODE_RAW_TEST_RESULT_TEXT_PATH = `null`

##### The full, raw test output file path


This is the path of the raw test results log file.



If the compilation fails this log will contain the compilation output,

if the tests can be started it'll only include the test output.

##### Required


`false`

### BITRISE_XCODE_TEST_ATTACHMENTS_PATH = `null`

##### The full, test attachments zip path


This is the path of the test attachments zip.

##### Required


`false`
