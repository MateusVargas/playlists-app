<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Playlist;
use App\Models\Video;

class PlaylistController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(["playlists"=>auth()->user()->playlists]);
    }

    /**
     * Display a total of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function totalPlaylists()
    {
        $total_playlists = auth()->user()->playlists->count();
        $total_videos = auth()->user()->videos->count();

        return response()->json(["playlists"=>$total_playlists,"videos"=>$total_videos]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255'
        ]);

        Playlist::create([
            'name' => $data['name'],
            'user_id' => auth()->user()->id
        ]);

        return response()->json(['success'=>true,'message'=>'playlist created successfully']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $playlist = Playlist::where('user_id',auth()->user()->id)
                        ->where('id',$id)
                        ->firstOrFail();

        $videos = $playlist->videos()->paginate(10);

        return response()->json(['playlist'=>$playlist,'videos'=>$videos]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $playlist = Playlist::where('user_id',auth()->user()->id)
                            ->where('id',$id)
                            ->firstOrFail();

        $data = $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $playlist->name = $data['name'];
        $playlist->save();

        return response()->json(['success'=>true,'message'=>'playlist updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $playlist = Playlist::where('user_id',auth()->user()->id)
                            ->where('id',$id)
                            ->firstOrFail();
        $playlist->delete();

        return response()->json(['success'=>true,'message'=>'playlist deleted successfully']);
    }
}
